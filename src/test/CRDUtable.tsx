import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Space,
  Modal,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { isEqualWith } from "lodash-es";

const { Option } = Select;

const BloodTypeOptions = [
  { value: "A", label: "A型" },
  { value: "B", label: "B型" },
  { value: "AB", label: "AB型" },
  { value: "O", label: "O型" },
  { value: "RH_A", label: "RH-A型" },
  { value: "RH_B", label: "RH-B型" },
  { value: "RH_AB", label: "RH-AB型" },
  { value: "RH_O", label: "RH-O型" },
];

// 初始数据
const initialData = [
  {
    key: "1",
    name: "张三",
    age: 25,
    birthday: "1998-05-15",
    height: 175,
    weight: 65,
    bloodType: "A",
  },
  {
    key: "2",
    name: "李四",
    age: 30,
    birthday: "1993-08-22",
    height: 180,
    weight: 75,
    bloodType: "B",
  },
  {
    key: "3",
    name: "王五",
    age: 28,
    birthday: "1995-03-10",
    height: 168,
    weight: 58,
    bloodType: "O",
  },
];

const CrudList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [formValuesChanged, setFormValuesChanged] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // 列定义
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "出生日期",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.birthday) - new Date(b.birthday),
    },
    {
      title: "身高 (cm)",
      dataIndex: "height",
      key: "height",
      sorter: (a, b) => a.height - b.height,
    },
    {
      title: "体重 (kg)",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: "血型",
      dataIndex: "bloodType",
      key: "bloodType",
      render: (text) => {
        const bloodType = BloodTypeOptions.find(
          (option) => option.value === text
        );
        return bloodType ? bloodType.label : text;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Space>
            <Button type="link" onClick={() => handleSave(record.key)}>
              保存
            </Button>
            <Button type="link" onClick={handleCancel}>
              取消
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除这条记录吗？"
              onConfirm={() => handleDelete(record.key)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" danger icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 编辑记录
  const handleEdit = (record) => {
    setCurrentRecord(record);
    const initialValues = {
      ...record,
      birthday: record.birthday ? dayjs(record.birthday) : null,
    };
    form.setFieldsValue(initialValues);
    setInitialFormValues(initialValues);
    setIsModalVisible(true);
    setFormValuesChanged(false);
    setFormIsValid(false);
  };

  // 添加新记录
  const handleAdd = () => {
    setCurrentRecord(null);
    form.resetFields();
    setInitialFormValues({});
    setIsModalVisible(true);
    setFormValuesChanged(false);
    setFormIsValid(false);
  };

  // 删除记录
  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("删除成功");
  };

  // 保存记录
  const handleSave = async (key) => {
    try {
      const values = await form.validateFields();

      const newData = data.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            ...values,
            birthday: values.birthday
              ? values.birthday.format("YYYY-MM-DD")
              : null,
          };
        }
        return item;
      });

      setData(newData);
      setEditingKey("");
      message.success("保存成功");
    } catch (error) {
      console.error("验证失败:", error);
    }
  };

  // 保存模态框中的记录
  const handleModalSave = async () => {
    try {
      const values = await form.validateFields();

      if (currentRecord) {
        // 更新现有记录
        const newData = data.map((item) => {
          if (item.key === currentRecord.key) {
            return {
              ...item,
              ...values,
              birthday: values.birthday
                ? values.birthday.format("YYYY-MM-DD")
                : null,
            };
          }
          return item;
        });
        setData(newData);
        message.success("更新成功");
      } else {
        // 添加新记录
        const newRecord = {
          key: `new-${Date.now()}`,
          ...values,
          birthday: values.birthday
            ? values.birthday.format("YYYY-MM-DD")
            : null,
        };
        setData([...data, newRecord]);
        message.success("添加成功");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("验证失败:", error);
    }
  };

  // 取消编辑
  const handleCancel = () => {
    setEditingKey("");
    setIsModalVisible(false);
    form.resetFields();
  };

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    // 检查表单是否有效
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        console.log("表单有效");
        setFormIsValid(true);
      })
      .catch((e) => {
        console.log("表单无效", e);
        setFormIsValid(false);
      });
  }, [form, values]);
  // 表单值变化处理
  const handleFormValuesChange = (changedValues, allValues) => {
    // 检查表单值是否改变
    // 检查表单值是否改变
    const hasChanged = !isEqualWith(
      allValues,
      initialFormValues,
      (value1, value2, key) => {
        // 特殊处理 birthday 字段
        if (key === "birthday") {
          if (dayjs.isDayjs(value1) && dayjs.isDayjs(value2)) {
            return value1.isSame(value2, "day");
          }
          // 处理 undefined/null 与 dayjs 对象的比较
          if ((value1 && !value2) || (!value1 && value2)) {
            return false;
          }
        }
        return undefined;
      }
    );

    setFormValuesChanged(hasChanged);
  };

  // 表单验证规则
  const formRules = {
    name: [
      { required: true, message: "请输入姓名" },
      { min: 2, max: 10, message: "姓名长度应为2-10个字符" },
      {
        pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
        message: "姓名只能包含中文或英文字母",
      },
    ],
    age: [
      { required: true, message: "请输入年龄" },
      { type: "number", min: 0, max: 150, message: "年龄应在0-150岁之间" },
    ],
    birthday: [
      { required: true, message: "请选择出生日期" },
      {
        validator: (_, value) => {
          if (value && value > dayjs()) {
            return Promise.reject(new Error("出生日期不能晚于今天"));
          }
          return Promise.resolve();
        },
      },
    ],
    height: [
      { required: true, message: "请输入身高" },
      { type: "number", min: 50, max: 250, message: "身高应在50-250cm之间" },
    ],
    weight: [
      { required: true, message: "请输入体重" },
      { type: "number", min: 20, max: 300, message: "体重应在20-300kg之间" },
    ],
    bloodType: [{ required: true, message: "请选择血型" }],
  };

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>人员信息列表</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加新记录
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      <Modal
        title={currentRecord ? "编辑记录" : "添加新记录"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleModalSave}
            disabled={!formValuesChanged || !formIsValid}
          >
            确定
          </Button>,
        ]}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleFormValuesChange}
          name="validateOnly"
        >
          <Form.Item label="姓名" name="name" rules={formRules.name}>
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item label="年龄" name="age" rules={formRules.age}>
            <InputNumber
              placeholder="请输入年龄"
              style={{ width: "100%" }}
              min={0}
              max={150}
            />
          </Form.Item>

          <Form.Item
            label="出生日期"
            name="birthday"
            rules={formRules.birthday}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="请选择出生日期"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>

          <div style={{ display: "flex", gap: 16 }}>
            <Form.Item
              label="身高 (cm)"
              name="height"
              rules={formRules.height}
              style={{ flex: 1 }}
            >
              <InputNumber
                placeholder="请输入身高"
                style={{ width: "100%" }}
                min={50}
                max={250}
                addonAfter="cm"
              />
            </Form.Item>

            <Form.Item
              label="体重 (kg)"
              name="weight"
              rules={formRules.weight}
              style={{ flex: 1 }}
            >
              <InputNumber
                placeholder="请输入体重"
                style={{ width: "100%" }}
                min={20}
                max={300}
                addonAfter="kg"
              />
            </Form.Item>
          </div>

          <Form.Item label="血型" name="bloodType" rules={formRules.bloodType}>
            <Select placeholder="请选择血型">
              {BloodTypeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#f6f6f6",
              borderRadius: 4,
              marginTop: 16,
            }}
          >
            <span style={{ color: "#666" }}>
              提示：只有修改了数据且符合校验条件时，确定按钮才会高亮
            </span>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CrudList;
