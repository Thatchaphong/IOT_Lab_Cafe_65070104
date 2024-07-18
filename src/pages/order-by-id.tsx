import { Alert, Badge, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { Order } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconEdit } from "@tabler/icons-react";

export default function OrderByIdPage() {
  const { orderId } = useParams();

  const { data: order, isLoading, error } = useSWR<Order>(`/orders/${orderId}`);

  return (
    <>
      <Layout>
        <Container className="mt-4">
          {/* You can use isLoading instead of !book */}
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
              <p className="italic text-neutral-500 mb-4">โดย {order.name}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <img
                  src="https://placehold.co/150x200"
                  alt={order.name}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="col-span-2 px-4 space-y-2 py-4">
                  <h3>รายละเอียดหนังสือ</h3>
                  <p className="indent-4">
                    {order.name}
        
                  </p>
                  

                  <h3>เรื่องย่อ</h3>
                  <p className="indent-4">
                    {order.name}
    
                  </p>
                  

                  <h3>หมวดหมู่</h3>
                  {<div className="flex flex-wrap gap-2">
                    <Badge color="teal">{order.name}</Badge>
                  </div>}
                </div>
              </div>

              <Divider className="mt-4" />

              
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
