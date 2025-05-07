import React from 'react';
import { Spin } from 'antd';
import '../../styles/animations.css';

interface LoadingSpinnerProps {
    tip?: string;
    size?: 'small' | 'default' | 'large';
    spinning?: boolean;
    fullPage?: boolean;
    delay?: number;
    children?: React.ReactNode;
}

/**
 * 自定义加载动画组件
 * 提供更美观的脉冲加载动画效果，支持全屏和局部加载
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    tip = '加载中...',
    size = 'default',
    spinning = true,
    fullPage = false,
    delay = 0,
    children
}) => {
    // 自定义加载指示器
    const customIndicator = (
        <div className="pulse-loading">
            <div></div>
            <div></div>
        </div>
    );

    // 全页面加载样式
    if (fullPage) {
        if (!spinning) return <>{children}</>;

        return (
            <div className="fullpage-loading-container">
                <div className="fullpage-loading-content">
                    {customIndicator}
                    {tip && <div className="loading-tip">{tip}</div>}
                </div>
            </div>
        );
    }

    // 局部加载
    return (
        <Spin
            indicator={customIndicator}
            tip={tip}
            size={size}
            spinning={spinning}
            delay={delay}
            className="custom-loading-spin"
        >
            {children}
        </Spin>
    );
};

export default LoadingSpinner; 