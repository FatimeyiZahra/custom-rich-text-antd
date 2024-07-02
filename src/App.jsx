import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import CustomRichTextEditor from "./CustomRichTextEditor";

const App = () => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldValue();
      console.log(values);
    } catch (err) {
      message.error("Please fill in all the required fields.");
    }
  };
  return (
    <>
      <Form form={form}>
        <Form.Item
          name="determined"
          label="Determined"
          labelCol={{ xs: 8, md: 9, lg: 4 }}
          wrapperCol={{ xs: 16, md: 15, lg: 20 }}
          labelAlign="left"
          rules={[
            {
              required: true,
              message: (
                <span
                  style={{
                    fontStyle: "italic",
                    fontSize: "10px",
                  }}
                >
                  Please enter the specified information.
                </span>
              ),
            },
          ]}
        >
          <Form.Item
            name="determined"
            valuePropName="value"
            getValueFromEvent={(e) => e}
            noStyle
          >
            <CustomRichTextEditor />
          </Form.Item>
        </Form.Item>
      </Form>
      <Button onClick={() => handleSubmit()}>Ok</Button>
    </>
  );
};

export default App;
