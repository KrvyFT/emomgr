import React from 'react';
import { Tag } from 'antd';
import { TagProps } from 'antd/lib/tag';
import { CSSProperties } from 'react';

// 预设的渐变颜色
export const tagGradients = {
    primary: 'linear-gradient(135deg, #1a237e 0%, #534bae 100%)',
    success: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    warning: 'linear-gradient(135deg, #ff8f00 0%, #ffca28 100%)',
    danger: 'linear-gradient(135deg, #c62828 0%, #ef5350 100%)',
    info: 'linear-gradient(135deg, #0277bd 0%, #4fc3f7 100%)',
    purple: 'linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%)',
    pink: 'linear-gradient(135deg, #ad1457 0%, #ec407a 100%)',
    teal: 'linear-gradient(135deg, #00695c 0%, #26a69a 100%)',
    amber: 'linear-gradient(135deg, #ff6f00 0%, #ffca28 100%)',
    lime: 'linear-gradient(135deg, #827717 0%, #d4e157 100%)',
    indigo: 'linear-gradient(135deg, #283593 0%, #5c6bc0 100%)',
    deepPurple: 'linear-gradient(135deg, #4527a0 0%, #7e57c2 100%)',
    orange: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)',
    cyan: 'linear-gradient(135deg, #006064 0%, #00bcd4 100%)',
    brown: 'linear-gradient(135deg, #4e342e 0%, #8d6e63 100%)',
    deepOrange: 'linear-gradient(135deg, #bf360c 0%, #ff7043 100%)',
    lightGreen: 'linear-gradient(135deg, #558b2f 0%, #aed581 100%)',
    blueGrey: 'linear-gradient(135deg, #37474f 0%, #78909c 100%)'
};

// 预设的纯色
export const tagColors = {
    primary: '#1a237e',
    success: '#2e7d32',
    warning: '#ff8f00',
    danger: '#c62828',
    info: '#0277bd',
    purple: '#6a1b9a',
    pink: '#ad1457',
    teal: '#00695c',
    amber: '#ff6f00',
    lime: '#827717',
    indigo: '#283593',
    deepPurple: '#4527a0',
    orange: '#e65100',
    cyan: '#006064',
    brown: '#4e342e',
    deepOrange: '#bf360c',
    lightGreen: '#558b2f',
    blueGrey: '#37474f'
};

// 圆角大小选项
export type BorderRadiusSize = 'small' | 'medium' | 'large' | 'pill';

// 边框样式选项
export type BorderStyle = 'solid' | 'dashed' | 'none';

export interface ColorfulTagProps extends Omit<TagProps, 'color'> {
    colorName?: keyof typeof tagColors; // 使用预设的颜色名称
    customColor?: string; // 自定义颜色
    useGradient?: boolean; // 是否使用渐变色
    borderRadius?: BorderRadiusSize; // 圆角大小
    borderStyle?: BorderStyle; // 边框样式
    glow?: boolean; // 是否添加发光效果
    animated?: boolean; // 是否添加动画
    fontSize?: number; // 字体大小
    fontWeight?: number | string; // 字体粗细
    letterSpacing?: number; // 字母间距
    padding?: string; // 内边距
    shadow?: boolean; // 是否添加阴影
    pulse?: boolean; // 是否添加脉冲动画
    borderWidth?: number; // 边框宽度
}

/**
 * 彩色标签组件
 * 提供丰富的颜色选项、渐变效果和动画
 */
const ColorfulTag: React.FC<ColorfulTagProps> = ({
    colorName = 'primary',
    customColor,
    useGradient = false,
    borderRadius = 'medium',
    borderStyle = 'solid',
    glow = false,
    animated = false,
    fontSize,
    fontWeight,
    letterSpacing,
    padding,
    shadow = false,
    pulse = false,
    borderWidth = 1,
    children,
    style,
    ...rest
}) => {
    // 计算边框半径值
    const getBorderRadius = (): string => {
        switch (borderRadius) {
            case 'small': return '4px';
            case 'medium': return '6px';
            case 'large': return '12px';
            case 'pill': return '100px';
            default: return '6px';
        }
    };

    // 获取颜色或渐变
    const getBackgroundColor = (): string => {
        if (customColor) return customColor;
        return useGradient ? tagGradients[colorName] : tagColors[colorName];
    };

    // 构建样式
    const getTagStyle = (): CSSProperties => {
        const baseStyle: CSSProperties = {
            background: getBackgroundColor(),
            color: '#ffffff',
            borderRadius: getBorderRadius(),
            borderStyle: borderStyle,
            borderWidth: `${borderWidth}px`,
            borderColor: useGradient ? 'transparent' : tagColors[colorName],
            fontSize: fontSize ? `${fontSize}px` : undefined,
            fontWeight: fontWeight || undefined,
            letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
            padding: padding || undefined,
            transition: 'all 0.3s ease',
            ...style
        };

        if (shadow) {
            baseStyle.boxShadow = `0 3px 5px rgba(0, 0, 0, 0.2)`;
        }

        if (glow) {
            baseStyle.boxShadow = `0 0 10px ${tagColors[colorName]}`;
        }

        return baseStyle;
    };

    // 获取动画类名
    const getAnimationClassName = (): string => {
        let className = '';

        if (animated) {
            className += ' tag-animated';
        }

        if (pulse) {
            className += ' tag-pulse';
        }

        return className.trim();
    };

    return (
        <Tag
            {...rest}
            style={getTagStyle()}
            className={`colorful-tag ${getAnimationClassName()} ${rest.className || ''}`}
        >
            {children}
        </Tag>
    );
};

export default ColorfulTag; 