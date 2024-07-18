import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import {Student } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function StudentsPage() {
  const { data: students, error } = useSWR<Student[]>("/students");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">นักศึกษา</h1>
          <h2>รายการนักศึกษา</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการนักศึกษา</h1>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/books/create"
              size="xs"
              variant="primary"
              className="flex items-center space-x-2"
            >
              เพิ่มนักศึกษา
            </Button>
          </div>

          {!students && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {students?.map((student) => (
              <div className="border border-solid border-neutral-200" key={student.id}>
                <img
                  src="https://placehold.co/150x200"
                  alt={student.firstname}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-2">{student.firstname}</h2>
                  <p className="text-xs text-neutral-500">โดย {student.firstname}</p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  <Button component={Link} to={`/students/${student.id}`} size="xs" variant="default">
                    ดูรายละเอียด
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
