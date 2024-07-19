import { Alert, Button, Container, Divider } from "@mantine/core";
import coffee from "../assets/images/coffee.png";
import Layout from "../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function OrderByIdPage() {
  const { orderId } = useParams();
  const [, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useSWR<Order>(`/orders/${orderId}`);

  const totalPrice = order ? order.price * order.quantity : 0;

  const handleDelete = async () => {
    try {
      setIsProcessing(true);
      await axios.delete(`/orders/${orderId}`);
      notifications.show({
        title: "ลบหนังสือสำเร็จ",
        message: "ลบหนังสือเล่มนี้ออกจากระบบเรียบร้อยแล้ว",
        color: "red",
      });
      navigate("/orders");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบข้อมูลหนังสือ",
            message: "ไม่พบข้อมูลหนังสือที่ต้องการลบ",
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
        <Container className="mt-4">
          {/* ใช้ isLoading แทน !order */}
          {isLoading && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          {!!order && (
            <>
              <h1>{order.name}</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <img
                  src={coffee}
                  alt={order.name}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="col-span-2 px-4 space-y-2 py-4">
                  <h3>รายละเอียดการสั่งเมนู</h3>
                  <p className="indent-4">
                    {order.name}
                  </p>

                  <h3>จำนวน</h3>
                  <p className="indent-4">
                    {order.quantity}
                  </p>

                  <h3>ราคา(ต่อที่)</h3>
                  <p className="indent-4">
                    {order.price}
                  </p>

                  <h3>ราคารวม</h3>
                  <p className="indent-4">
                    {totalPrice}
                  </p>
                </div>
              </div>

              <Divider className="mt-4" />
              <Button
                    color="red"
                    leftSection={<IconTrash />}
                    size="xs"
                    onClick={() => {
                      modals.openConfirmModal({
                        title: "คุณต้องการลบหนังสือเล่มนี้ใช่หรือไม่",
                        children: (
                          <span className="text-xs">
                            เมื่อคุณดำนเนินการลบหนังสือเล่มนี้แล้ว จะไม่สามารถย้อนกลับได้
                          </span>
                        ),
                        labels: { confirm: "ลบ", cancel: "ยกเลิก" },
                        onConfirm: () => {
                          handleDelete();
                        },
                        confirmProps: {
                          color: "red",
                        },
                      });
                    }}
                  >
                    ลบหนังสือนี้
                  </Button>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
