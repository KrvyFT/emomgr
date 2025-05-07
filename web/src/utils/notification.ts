import { message, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

// 成功消息提示
export const showSuccess = (content: string, duration = 3) => {
    message.success({
        content,
        duration,
        style: { marginTop: '20px' },
        className: 'custom-message-animation',
    });
};

// 错误消息提示
export const showError = (content: string, duration = 5) => {
    message.error({
        content,
        duration,
        style: { marginTop: '20px' },
        className: 'custom-message-animation',
    });
};

// 警告消息提示
export const showWarning = (content: string, duration = 4) => {
    message.warning({
        content,
        duration,
        style: { marginTop: '20px' },
        className: 'custom-message-animation',
    });
};

// 信息消息提示
export const showInfo = (content: string, duration = 3) => {
    message.info({
        content,
        duration,
        style: { marginTop: '20px' },
        className: 'custom-message-animation',
    });
};

// 加载消息提示
export const showLoading = (content: string) => {
    return message.loading({
        content,
        duration: 0,
        style: { marginTop: '20px' },
        className: 'custom-message-animation',
    });
};

// 显示通知
export const showNotification = (
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    description: string,
    placement: NotificationPlacement = 'topRight',
    duration = 4.5
) => {
    notification[type]({
        message: title,
        description,
        placement,
        duration,
        className: 'custom-notification-animation',
        style: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px'
        }
    });
};

// 静默操作，不显示消息提示
export const silentOperation = async <T>(
    operation: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: unknown) => void
): Promise<T | undefined> => {
    try {
        const result = await operation();
        onSuccess && onSuccess(result);
        return result;
    } catch (error) {
        onError && onError(error);
        console.error('操作失败:', error);
        return undefined;
    }
};

// CRUD操作相关的消息
export const crudMessages = {
    createSuccess: '创建成功',
    updateSuccess: '更新成功',
    deleteSuccess: '删除成功',
    querySuccess: '查询成功',
    createError: '创建失败',
    updateError: '更新失败',
    deleteError: '删除失败',
    queryError: '查询失败',
    confirmDelete: '确定要删除吗？此操作不可恢复',
    networkError: '网络连接错误，请检查网络后重试',
    unauthorized: '您没有权限执行此操作',
    sessionExpired: '登录已过期，请重新登录',
}; 