import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/layout";
import { Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Order } from "../lib/models";

export default function OrderCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: "" };

  const [isProcessing, setIsProcessing] = useState(false);

  const orderCreateForm = useForm({
    initialValues: {
      name: name,
      quantity: 1,
      note: ""
    },
    validate: {
      quantity: isNotEmpty("กรุณาระบุจำนวนที่ต้องการ"),
    },
  });

  const handleSubmit = async (values: typeof orderCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Order>(`/orders`, values);
      notifications.show({
        title: "สั่งเมนูสำเร็จ",
        message: "สั่งเรียบร้อยแล้วกรุณารอสักครู่",
        color: "teal",
      });
      navigate(`/orders/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-8">
          <h1 className="text-xl">สั่งเมนู</h1>
          <br />
          <form onSubmit={orderCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
              label="ชื่อ"
              placeholder="ชื่อ"
              {...orderCreateForm.getInputProps("name")}
              readOnly
            />

            <NumberInput
              label="จำนวน"
              placeholder="จำนวน"
              {...orderCreateForm.getInputProps("quantity")}
            />

            <TextInput
              label="หมายเหตุ"
              placeholder="หมายเหตุ"
              {...orderCreateForm.getInputProps("note")}
            />

            <Divider />

            <Button type="submit" loading={isProcessing}>
              สั่งเลย
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}
