#!/bin/bash

# 数据库连接信息
DB_USER="krvy"
DB_PASSWORD="vneipack"
DB_NAME="emomgr"
DB_HOST="localhost"

# 创建临时SQL文件
cat > init_db.sql << EOF
-- 删除已存在的表（如果有）以避免错误
DROP TABLE IF EXISTS salary;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS user;

-- 创建用户表（注意：将sex字段从BOOLEAN改为INT以匹配Java实体类）
CREATE TABLE user(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP NULL COMMENT 'Create Time',
    update_time datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    username VARCHAR(255) NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    avatar VARCHAR(255) DEFAULT "default" COMMENT '头像',
    sex INT DEFAULT 1 COMMENT '性别',
    age INT DEFAULT 18 COMMENT '年龄'
) COMMENT '';

-- 插入用户数据
INSERT INTO user (username, password, avatar, sex, age) VALUES
('alice', 'password123', 'avatar1.png', 1, 25),
('bob', 'securepass', 'avatar2.png', 0, 30),
('charlie', 'charliepwd', 'default', 1, 22);

-- 创建部门表
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    name VARCHAR(100) NOT NULL UNIQUE COMMENT '部门名称',
    description VARCHAR(255) DEFAULT NULL COMMENT '部门描述',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT='部门表';

-- 插入部门数据
INSERT INTO department (name, description) VALUES
('研发部', '负责产品研发与技术创新'),
('管理部', '负责公司日常管理与协调'),
('财务部', '负责公司财务与会计工作');

-- 创建员工表
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '员工主键',
    name VARCHAR(100) NOT NULL COMMENT '员工姓名',
    department_id INT NOT NULL COMMENT '所属部门ID',
    position VARCHAR(100) DEFAULT NULL COMMENT '职位',
    hire_date DATE DEFAULT NULL COMMENT '入职日期',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (department_id) REFERENCES department(id)
) COMMENT='员工信息表';

-- 插入员工数据
INSERT INTO employee (name, department_id, position, hire_date) VALUES
('张三', 1, '开发工程师', '2022-03-01'),
('李四', 2, '行政主管', '2021-07-15'),
('王五', 3, '会计', '2023-01-10');

-- 创建薪资表
CREATE TABLE salary (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '薪资主键',
    employee_id INT NOT NULL COMMENT '员工ID',
    amount DECIMAL(10,2) NOT NULL COMMENT '薪资金额',
    pay_date DATE NOT NULL COMMENT '发放日期',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (employee_id) REFERENCES employee(id)
) COMMENT='薪资表';
EOF

# 执行SQL文件
echo "正在初始化数据库..."
mysql -u$DB_USER -p$DB_PASSWORD -h$DB_HOST $DB_NAME < init_db.sql

# 检查执行结果
if [ $? -eq 0 ]; then
    echo "数据库初始化成功！"
    # 清理临时文件
    rm init_db.sql
else
    echo "数据库初始化失败，请检查错误信息。"
fi 