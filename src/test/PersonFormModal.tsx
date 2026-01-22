import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Button,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
} from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

// 定义组件的 Props 类型
interface PersonFormModalProps {
  /** 控制模态框显示/隐藏 */
  open: boolean;
  /** 模态框标题 */
  title?: string;
  /** 表单初始值（编辑时传入） */
  initialValues?: Partial<PersonFormValues>;
  /** 操作模式：add-新增, edit-编辑 */
  mode: "add" | "edit";
  /** 表单提交的回调函数 */
  onSubmit: (values: PersonFormValues) => Promise<void> | void;
  /** 取消/关闭的回调函数 */
  onCancel: () => void;
  /** 是否正在提交中（用于显示加载状态） */
  submitting?: boolean;
  /** 自定义宽度 */
  width?: number;
}

// 表单值类型定义
export interface PersonFormValues {
  name: string;
  age: number;
  birthDate: Dayjs;
  height: number;
  weight: number;
  bloodType: "A" | "B" | "AB" | "O";
}

// 血型选项
const BLOOD_TYPE_OPTIONS = [
  { value: "A", label: "A型" },
  { value: "B", label: "B型" },
  { value: "AB", label: "AB型" },
  { value: "O", label: "O型" },
];

const PersonFormModal: React.FC<PersonFormModalProps> = ({
  open,
  title,
  initialValues,
  mode,
  onSubmit,
  onCancel,
  submitting = false,
  width = 600,
}) => {
  const [form] = Form.useForm();
  const [hasFormErrors, setHasFormErrors] = useState<boolean>(true);
  const [isFormModified, setIsFormModified] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // 表单验证规则
  const formRules = {
    name: [
      { required: true, message: "请输入姓名" },
      { min: 2, max: 20, message: "姓名长度在2-20个字符之间" },
      {
        pattern: /^[\u4e00-\u9fa5a-zA-Z·]+$/,
        message: "姓名只能包含中文、英文字母或间隔号",
      },
    ],
    age: [
      { required: true, message: "请输入年龄" },
      { type: "number", min: 1, max: 150, message: "年龄必须在1-150之间" },
    ],
    birthDate: [
      { required: true, message: "请选择出生日期" },
      {
        validator: (_: any, value: Dayjs) => {
          if (value && value.isAfter(dayjs())) {
            return Promise.reject(new Error("出生日期不能晚于今天"));
          }
          return Promise.resolve();
        },
      },
    ],
    height: [
      { required: true, message: "请输入身高" },
      { type: "number", min: 50, max: 300, message: "身高必须在50-300cm之间" },
    ],
    weight: [
      { required: true, message: "请输入体重" },
      { type: "number", min: 5, max: 500, message: "体重必须在5-500kg之间" },
    ],
    bloodType: [{ required: true, message: "请选择血型" }],
  };

  // 检查表单校验状态
  const checkFormValidity = useCallback(async () => {
    setIsValidating(true);
    try {
      await form.validateFields();
      const errorFields = form.getFieldsError();
      const hasErrors = errorFields.some((field) => field.errors.length > 0);
      setHasFormErrors(hasErrors);
    } catch (error) {
      setHasFormErrors(true);
    } finally {
      setIsValidating(false);
    }
  }, [form]);

  // 表单值变化处理
  const handleValuesChange = useCallback(() => {
    if (!isFormModified) {
      setIsFormModified(true);
    }
    checkFormValidity();
  }, [isFormModified, checkFormValidity]);

  // 表单提交处理
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      handleClose();
    } catch (error) {
      console.error("表单提交失败:", error);
      message.error("表单提交失败，请检查输入");
    }
  };

  // 关闭模态框
  const handleClose = () => {
    form.resetFields();
    setHasFormErrors(true);
    setIsFormModified(false);
    onCancel();
  };

  // 判断保存按钮是否禁用
  const isSaveDisabled = () => {
    // 正在校验中
    if (isValidating) return true;
    // 表单有错误
    if (hasFormErrors) return true;
    // 编辑模式下但表单未修改
    if (mode === "edit" && !isFormModified) return true;
    // 正在提交中
    if (submitting) return true;
    return false;
  };

  // 初始化表单
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          birthDate: initialValues.birthDate
            ? dayjs(initialValues.birthDate)
            : undefined,
        });
        setIsFormModified(false);
      } else {
        form.resetFields();
        setIsFormModified(true); // 新增模式默认认为有修改
      }
      // 打开时检查一次表单状态
      setTimeout(() => {
        checkFormValidity();
      }, 100);
    }
  }, [open, initialValues, form, checkFormValidity]);

  // 生成模态框标题
  const modalTitle = title || (mode === "add" ? "新增人员" : "编辑人员");

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={handleClose}
      width={width}
      footer={[
        <Button key="cancel" onClick={handleClose} icon={<CloseOutlined />}>
          取消
        </Button>,
        <Button
          key="save"
          type="primary"
          icon={<SaveOutlined />}
          loading={submitting}
          disabled={isSaveDisabled()}
          onClick={handleSubmit}
          style={{
            opacity: isSaveDisabled() ? 0.6 : 1,
            cursor: isSaveDisabled() ? "not-allowed" : "pointer",
          }}
        >
          {mode === "add" ? "新增" : "保存"}
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFieldsChange={checkFormValidity}
        autoComplete="off"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {/* 姓名 */}
          <Form.Item label="姓名" name="name" rules={formRules.name} required>
            <Input
              placeholder="请输入姓名"
              allowClear
              maxLength={20}
              showCount
            />
          </Form.Item>

          {/* 年龄 */}
          <Form.Item label="年龄" name="age" rules={formRules.age} required>
            <InputNumber
              placeholder="请输入年龄"
              min={1}
              max={150}
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* 出生日期 */}
          <Form.Item
            label="出生日期"
            name="birthDate"
            rules={formRules.birthDate}
            required
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="请选择出生日期"
              format="YYYY-MM-DD"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>

          {/* 血型 */}
          <Form.Item
            label="血型"
            name="bloodType"
            rules={formRules.bloodType}
            required
          >
            <Select placeholder="请选择血型" options={BLOOD_TYPE_OPTIONS} />
          </Form.Item>

          {/* 身高 */}
          <Form.Item
            label="身高 (cm)"
            name="height"
            rules={formRules.height}
            required
          >
            <InputNumber
              placeholder="请输入身高"
              min={50}
              max={300}
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* 体重 */}
          <Form.Item
            label="体重 (kg)"
            name="weight"
            rules={formRules.weight}
            required
          >
            <InputNumber
              placeholder="请输入体重"
              min={5}
              max={500}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        {/* 状态提示 */}
        <div
          style={{
            marginTop: 16,
            padding: 8,
            background: "#f6f6f6",
            borderRadius: 4,
            fontSize: 12,
            color: "#666",
          }}
        >
          {isValidating && "正在校验表单..."}
          {!isValidating && hasFormErrors && "请正确填写所有字段"}
          {!isValidating &&
            !hasFormErrors &&
            mode === "edit" &&
            !isFormModified &&
            "未检测到修改"}
          {!isValidating &&
            !hasFormErrors &&
            (mode === "add" || isFormModified) &&
            "✓ 表单验证通过，可以保存"}
        </div>
      </Form>
    </Modal>
  );
};

export default PersonFormModal;
