import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import useToken from "antd/es/theme/useToken";
import React, { useState } from "react";

function Search(props) {
  console.log("Search render");
  const { onValuesChange, searchParams } = props;
  const token = useToken();
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children: React.ReactNode[] = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: "Select something!",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: "1",
                    label:
                      "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                  },
                  {
                    value: "2",
                    label: "222",
                  },
                ]}
              />
            </Form.Item>
          )}
        </Col>,
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={searchParams}
      >
        <Row gutter={24}>{getFields()}</Row>
        <div style={{ textAlign: "end" }}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
            <a
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <DownOutlined rotate={expand ? 180 : 0} /> Collapse
            </a>
          </Space>
        </div>
      </Form>
    </div>
  );
}

export default React.memo(Search);
