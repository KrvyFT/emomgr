import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface AnimatedButtonProps extends ButtonProps {
    rippleEffect?: boolean;
    hoverScale?: boolean;
}

/**
 * 带动画效果的按钮组件
 * 基于Ant Design的Button组件，增加波纹点击效果和悬浮缩放
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    children,
    className = '',
    rippleEffect = true,
    hoverScale = true,
    ...props
}) => {
    let combinedClassName = className;

    if (rippleEffect) {
        combinedClassName += ' btn-ripple';
    }

    if (hoverScale) {
        combinedClassName += ' btn-scale';
    }

    // 添加自定义点击效果
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (rippleEffect) {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 创建并应用点击特效
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        }

        // 调用原始的onClick
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <Button
            {...props}
            className={combinedClassName}
            onClick={handleClick}
        >
            {children}
        </Button>
    );
};

export default AnimatedButton; 