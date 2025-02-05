import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import cafeBackgroundImage2 from "../assets/images/bg-cafe-2.jpg";
import man from "../assets/images/Human.jpg";
import { Student } from "../lib/models";
import useSWR from "swr";


export default function HomePage() {
  const { data: students } = useSWR<Student[]>("/students");
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>


      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">

            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things และนายกฤตณัฏฐ์
            ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ FastAPI และ React ในวิชานี้
          </p>

          <div>
            <img src={man} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>
        {students?.map((student) => (
          <p className="text-right mt-8">
            ปัจจุบันค่าเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ {student.firstname} {student.lastname} ซึ่งมีบริการ หนังสือต่างๆให้อ่าน และสามารถสั่งเครื่องดื่มได้
          </p>
        ))}
      </section>

      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage2})`,
        }}
      >
        <h1 className="text-5xl mb-2">65070104</h1>
        <h2>ธัชพงศ์ ไพศาลธนภรณ์</h2>
      </section>
    </Layout>
  );
}
