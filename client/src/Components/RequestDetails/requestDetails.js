import React, { useState } from "react";
import {
  Row,
  Col,
  Collapse,
  Form,
  Typography,
  Button,
  List,
  Input,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
import ShippingAddressPanel from "./Panels/shippingAddressPanel";
import ShippingNoteAndDeliveryDatePanel from "./Panels/shippingNoteAndDeliveryDatePanel";
import CustomsInformationPanel from "./Panels/customsInformationPanel";
import SaveButton from "./saveButton";
import Sidebar from "../../Pages/RequestDetails/Sidebar/sidebar";
import useGetQuoteDetails from "../../Hooks/useGetQuoteDetails";
import "./requestDetails.css";

const { Panel } = Collapse;
const { Paragraph, Title } = Typography;

const RequestDetails = ({ orderId }) => {
  const [form] = useForm();
  const [activeKey, setActiveKey] = useState(["1"]);
  const [formValues, setFormValues] = useState({});
  const { formData, fileList } = useGetQuoteDetails(orderId);
  const navigate = useNavigate();

  const handleFormChange = (_, allValues) => {
    setFormValues(allValues);
  };

  const goBack = () => {
    navigate(`/get-quote/${orderId}`);
  };

  return (
    <div className="request-details-container">
      <Row gutter={24}>
        <Col span={6}>
          <Sidebar orderId={orderId} />
        </Col>
        <Col span={16}>
          <Col span={24} style={{ marginBottom: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={4}>We received your request!</Title>
            </div>
            <Paragraph>
              <strong>Please fill extra information below</strong> to get a
              quotation with delivery options. Otherwise, we will send you a
              quotation for only manufacturing with estimated production time.
            </Paragraph>
          </Col>
          <Button
            onClick={goBack}
            type="link"
            style={{ padding: 0, margin: 0 }}
          >
            Back to Get Quote
          </Button>
          <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
            <Collapse
              activeKey={activeKey}
              onChange={(key) => setActiveKey(key)}
            >
              <Panel header="Shipping Address" key="1">
                <ShippingAddressPanel form={form} />
              </Panel>
              <Panel header="Shipping Note & Delivery Date" key="3">
                <ShippingNoteAndDeliveryDatePanel form={form} />
              </Panel>
              <Panel header="Information Required for Customs" key="5">
                <CustomsInformationPanel form={form} />
              </Panel>
            </Collapse>
            <Col span={24} style={{ marginTop: "20px" }}>
              <SaveButton shippingFormData={formValues} />
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RequestDetails;