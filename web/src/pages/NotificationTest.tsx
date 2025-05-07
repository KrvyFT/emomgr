import React from 'react';
import { Button, Space, Card, Divider } from 'antd';
import {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showNotification,
    crudMessages
} from '../utils/notification';

const NotificationTest: React.FC = () => {
    // 测试消息通知
    const testMessages = () => {
        showSuccess('这是一条成功消息');
        setTimeout(() => {
            showInfo('这是一条信息消息');
        }, 1000);
        setTimeout(() => {
            showWarning('这是一条警告消息');
        }, 2000);
        setTimeout(() => {
            showError('这是一条错误消息');
        }, 3000);
    };

    // 测试通知
    const testNotifications = () => {
        showNotification(
            'success',
            '操作成功',
            '您的操作已成功完成'
        );
        setTimeout(() => {
            showNotification(
                'info',
                '系统通知',
                '这是一条重要的系统通知'
            );
        }, 1000);
        setTimeout(() => {
            showNotification(
                'warning',
                '注意',
                '请注意系统将在30分钟后进行维护'
            );
        }, 2000);
        setTimeout(() => {
            showNotification(
                'error',
                '操作失败',
                '无法完成操作，请稍后重试'
            );
        }, 3000);
    };

    // 测试不同位置的通知
    const testNotificationPositions = () => {
        const positions = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;

        positions.forEach((position, index) => {
            setTimeout(() => {
                showNotification(
                    'info',
                    `${position} 位置通知`,
                    `这是一条显示在 ${position} 位置的通知`,
                    position
                );
            }, index * 1000);
        });
    };

    return (
        <Card title="通知测试页面" style={{ maxWidth: 800, margin: '20px auto' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Divider orientation="left">消息类型测试</Divider>
                <Space>
                    <Button type="primary" onClick={() => showSuccess('成功消息测试')}>
                        成功消息
                    </Button>
                    <Button type="default" onClick={() => showInfo('信息消息测试')}>
                        信息消息
                    </Button>
                    <Button type="default" danger onClick={() => showError('错误消息测试')}>
                        错误消息
                    </Button>
                    <Button type="dashed" onClick={() => showWarning('警告消息测试')}>
                        警告消息
                    </Button>
                </Space>

                <Divider orientation="left">通知类型测试</Divider>
                <Space>
                    <Button type="primary" onClick={() => showNotification('success', '成功', '操作已成功完成')}>
                        成功通知
                    </Button>
                    <Button onClick={() => showNotification('info', '信息', '这是一条信息通知')}>
                        信息通知
                    </Button>
                    <Button danger onClick={() => showNotification('error', '错误', '操作失败，请重试')}>
                        错误通知
                    </Button>
                    <Button type="dashed" onClick={() => showNotification('warning', '警告', '注意系统即将维护')}>
                        警告通知
                    </Button>
                </Space>

                <Divider orientation="left">批量测试</Divider>
                <Space>
                    <Button type="primary" onClick={testMessages}>
                        测试所有消息
                    </Button>
                    <Button onClick={testNotifications}>
                        测试所有通知
                    </Button>
                    <Button onClick={testNotificationPositions}>
                        测试通知位置
                    </Button>
                </Space>
            </Space>
        </Card>
    );
};

export default NotificationTest; 