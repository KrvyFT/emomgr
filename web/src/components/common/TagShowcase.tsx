import React, { useState } from 'react';
import { Card, Divider, Switch, Radio, RadioChangeEvent, InputNumber, Row, Col } from 'antd';
import ColorfulTag, { tagColors, BorderRadiusSize, BorderStyle } from './ColorfulTag';
import '../../styles/animations.css';
import './TagShowcase.css'; // 引入样式文件

/**
 * 标签展示组件
 * 用于展示各种预设的标签样式和效果，并提供交互式设置
 */
const TagShowcase: React.FC = () => {
    // 标签设置状态
    const [useGradient, setUseGradient] = useState(false);
    const [borderRadius, setBorderRadius] = useState<BorderRadiusSize>('medium');
    const [borderStyle, setBorderStyle] = useState<BorderStyle>('solid');
    const [glow, setGlow] = useState(false);
    const [animated, setAnimated] = useState(false);
    const [shadow, setShadow] = useState(false);
    const [pulse, setPulse] = useState(false);
    const [fontSize, setFontSize] = useState<number>(14);
    const [borderWidth, setBorderWidth] = useState<number>(1);
    const [padding, setPadding] = useState<string>('0 8px');

    // 渲染不同类型的标签展示区
    const renderTagSection = (title: string, tagType: 'basic' | 'gradient' | 'animated') => {
        return (
            <div className="tag-section">
                <Divider orientation="left">{title}</Divider>
                <div className="colorful-tags-container">
                    {Object.keys(tagColors).map((color) => {
                        // 根据展示类型设置标签属性
                        const tagProps = {
                            colorName: color as keyof typeof tagColors,
                            useGradient: tagType === 'gradient' || useGradient,
                            glow: tagType === 'animated' ? true : glow,
                            animated: tagType === 'animated' ? true : animated,
                            pulse: tagType === 'animated' ? true : pulse,
                            shadow: tagType === 'animated' ? true : shadow,
                            borderRadius,
                            borderStyle,
                            fontSize,
                            borderWidth,
                            padding,
                        };

                        return (
                            <ColorfulTag key={color} {...tagProps}>
                                {color}
                            </ColorfulTag>
                        );
                    })}
                </div>
            </div>
        );
    };

    // 处理边框圆角变化
    const handleBorderRadiusChange = (e: RadioChangeEvent) => {
        setBorderRadius(e.target.value as BorderRadiusSize);
    };

    // 处理边框样式变化
    const handleBorderStyleChange = (e: RadioChangeEvent) => {
        setBorderStyle(e.target.value as BorderStyle);
    };

    return (
        <Card title="彩色标签展示" className="card-hover-effect">
            <div className="tag-showcase">
                {/* 控制面板 */}
                <Card title="标签设置" size="small" className="mb-4">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">使用渐变色:</span>
                                <Switch checked={useGradient} onChange={setUseGradient} />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">发光效果:</span>
                                <Switch checked={glow} onChange={setGlow} />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">进入动画:</span>
                                <Switch checked={animated} onChange={setAnimated} />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">脉冲动画:</span>
                                <Switch checked={pulse} onChange={setPulse} />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">阴影效果:</span>
                                <Switch checked={shadow} onChange={setShadow} />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">字体大小:</span>
                                <InputNumber
                                    min={10}
                                    max={20}
                                    value={fontSize}
                                    onChange={(value) => setFontSize(value || 14)}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="setting-item">
                                <span className="setting-label">边框宽度:</span>
                                <InputNumber
                                    min={0}
                                    max={3}
                                    value={borderWidth}
                                    onChange={(value) => setBorderWidth(value || 1)}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div className="setting-item">
                                <span className="setting-label">边框圆角:</span>
                                <Radio.Group onChange={handleBorderRadiusChange} value={borderRadius}>
                                    <Radio value="small">小</Radio>
                                    <Radio value="medium">中</Radio>
                                    <Radio value="large">大</Radio>
                                    <Radio value="pill">胶囊形</Radio>
                                </Radio.Group>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="setting-item">
                                <span className="setting-label">边框样式:</span>
                                <Radio.Group onChange={handleBorderStyleChange} value={borderStyle}>
                                    <Radio value="solid">实线</Radio>
                                    <Radio value="dashed">虚线</Radio>
                                    <Radio value="none">无边框</Radio>
                                </Radio.Group>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* 基础标签展示 */}
                {renderTagSection('基础标签', 'basic')}

                {/* 渐变标签展示 */}
                {renderTagSection('渐变标签', 'gradient')}

                {/* 动画标签展示 */}
                {renderTagSection('动效标签', 'animated')}
            </div>
        </Card>
    );
};

export default TagShowcase; 