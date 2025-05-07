import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useRef } from 'react';

interface AnimatedTableProps<RecordType> extends TableProps<RecordType> {
    highlightNewItems?: boolean; // 是否高亮显示新增项
    animationDuration?: number; // 动画持续时间
}

/**
 * 带动画效果的表格组件
 * 继承自Ant Design的Table组件，为行添加进入和高亮动画
 */
function AnimatedTable<RecordType extends object = any>(
    props: AnimatedTableProps<RecordType>
) {
    const {
        dataSource,
        highlightNewItems = true,
        animationDuration = 500,
        ...restProps
    } = props;

    const [displayData, setDisplayData] = useState<RecordType[]>([]);
    const prevDataSourceRef = useRef<RecordType[]>([]);
    const newItemsRef = useRef<Set<string>>(new Set());

    // 处理数据源变化
    useEffect(() => {
        if (!dataSource) {
            setDisplayData([]);
            return;
        }

        // 复制当前数据源
        const currentDataKeys = new Set(dataSource.map(item =>
            (item as any).id || (item as any).key
        ));

        // 查找新增项
        if (highlightNewItems && prevDataSourceRef.current) {
            const prevDataKeys = new Set(prevDataSourceRef.current.map(item =>
                (item as any).id || (item as any).key
            ));

            // 标记新项
            currentDataKeys.forEach(key => {
                if (key && !prevDataKeys.has(key)) {
                    newItemsRef.current.add(key.toString());

                    // 3秒后清除高亮
                    setTimeout(() => {
                        newItemsRef.current.delete(key.toString());
                    }, 3000);
                }
            });
        }

        // 更新显示数据 - 创建一个新数组以避免readonly问题
        setDisplayData([...dataSource]);

        // 保存当前数据源以供下次比较
        prevDataSourceRef.current = [...dataSource];
    }, [dataSource, highlightNewItems]);

    // 为行添加动画类
    const getRowClassName = (record: RecordType, index: number) => {
        const key = (record as any).id || (record as any).key;

        if (newItemsRef.current.has(key?.toString())) {
            return 'table-row-new table-row-animation';
        }

        return 'table-row-animation';
    };

    // 应用行动画样式
    const onRow = (record: RecordType, index?: number) => {
        return {
            style: {
                animationDelay: `${index! * 50}ms`, // 行动画依次延迟显示
                animationDuration: `${animationDuration}ms`,
            }
        };
    };

    return (
        <Table<RecordType>
            {...restProps}
            dataSource={displayData}
            rowClassName={getRowClassName}
            onRow={onRow}
        />
    );
}

export default AnimatedTable; 