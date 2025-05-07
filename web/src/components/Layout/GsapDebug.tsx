import React, { useEffect, useRef, useState } from 'react';
import './GsapDebug.css';

const GsapDebug: React.FC = () => {
    const [gsapStatus, setGsapStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadAndTestGsap = async () => {
            try {
                // 尝试导入GSAP
                const gsapModule = await import('gsap');

                // 检查GSAP是否正确导入
                if (!gsapModule || !gsapModule.gsap) {
                    setGsapStatus('error');
                    setErrorMessage('GSAP模块加载成功，但gsap对象不存在');
                    return;
                }

                // 尝试创建一个简单的动画
                if (boxRef.current) {
                    try {
                        gsapModule.gsap.to(boxRef.current, {
                            x: 100,
                            duration: 1,
                            ease: "power2.out"
                        });
                        setGsapStatus('success');
                    } catch (animationError) {
                        setGsapStatus('error');
                        setErrorMessage(`动画创建失败: ${animationError instanceof Error ? animationError.message : String(animationError)}`);
                    }
                } else {
                    setGsapStatus('error');
                    setErrorMessage('DOM元素引用不存在');
                }
            } catch (e) {
                setGsapStatus('error');
                setErrorMessage(`GSAP加载失败: ${e instanceof Error ? e.message : String(e)}`);
            }
        };

        loadAndTestGsap();
    }, []);

    return (
        <div className="gsap-debug">
            <h3>GSAP调试工具</h3>
            <div className="debug-status">
                状态: <span className={gsapStatus}>{
                    gsapStatus === 'loading' ? '加载中...' :
                        gsapStatus === 'success' ? '正常工作' :
                            '加载失败'
                }</span>
            </div>

            {gsapStatus === 'error' && (
                <div className="debug-error">
                    错误信息: {errorMessage}
                </div>
            )}

            <div
                ref={boxRef}
                className="debug-box"
            >
            </div>
        </div>
    );
};

export default GsapDebug; 