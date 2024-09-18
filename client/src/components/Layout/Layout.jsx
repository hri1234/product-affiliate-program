import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomizerContext from "../../Context/Customizer";
import Footer from "./Footer/Footer";
import Header from "./Header";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import TapTop from "./TapTop";
import Themecustomizer from "./ThemeCustomizer";
import Cookies from 'js-cookie';

const Layout = () => {
  const { sidebar_types, setTogglSidebar, setSidebarTypes, defaultClass, setDefaultClass, } = useContext(CustomizerContext);

  const navigate = useNavigate()

  const compactSidebar = () => {
    let sidebar_types1 = localStorage.getItem("sidebar_types");
    if (sidebar_types1 === "compact-wrapper") {
      if (window.innerWidth <= 1200) {
        setDefaultClass(true);
        setTogglSidebar(true);
      } else {
        setDefaultClass(false);
        setTogglSidebar(false);
      }
    } else if (sidebar_types1 === "horizontal-wrapper") {
      if (window.innerWidth <= 1200) {
        setDefaultClass(true);
        setTogglSidebar(true);
        setSidebarTypes("compact-wrapper");
      } else {
        setDefaultClass(false);
        setTogglSidebar(false);
        setSidebarTypes("horizontal-wrapper");
      }
    }
  };

  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
      if (window.innerWidth <= 1200) {
        setDefaultClass(true);
        setTogglSidebar(true);
      } else {
        setTogglSidebar(false);
        setDefaultClass(false);
      }
    });
  }, [sidebar_types]);
  return (
    <>
      <Loader />
      <TapTop />
      <div className={`page-wrapper w-full h-full ${defaultClass ? "compact-wrapper" : sidebar_types}`}>
        <Header />

        <div className={`page-body-wrapper h-full w-full  `}>
          <Sidebar />
          {/* <div className=" w-full h-full "> */}
          <Outlet />
          {/* </div> */}
          {/* <div className=" w-1/2 h-full bg-slate-200">

           Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur cum doloremque beatae at facilis! Soluta deserunt non impedit porro, velit quam et minima doloribus necessitatibus error autem debitis inventore ipsa delectus fugit temporibus animi nulla harum aperiam assumenda omnis tempore repellendus? Commodi excepturi exercitationem cumque obcaecati, debitis a distinctio quasi, qui amet unde eum perferendis pariatur facilis quis id quaerat rem, molestiae alias incidunt reiciendis sapiente modi aliquam enim! Doloremque error, doloribus accusamus quia laboriosam alias nisi voluptatum enim velit quidem corrupti quae, animi deserunt inventore consequatur. Ex, quis vitae delectus itaque praesentium incidunt. A cupiditate esse quis alias magnam ad doloribus! Labore laudantium voluptate id animi similique, magnam necessitatibus dolores nobis fugit magni deserunt incidunt minima, iure natus totam itaque iste unde quae quidem quo, laborum autem? Totam libero qui natus molestias fugiat ipsam labore animi culpa consectetur quos explicabo dolores, eius voluptatum repellat perferendis nam tempora iusto numquam dicta fuga! In expedita architecto mollitia nemo, saepe minus distinctio qui, magni cumque corrupti, aliquam commodi soluta sint sed ut quas id rem eum repudiandae corporis quod pariatur harum! Explicabo commodi ratione iste, soluta non optio aut corrupti laborum reiciendis quis facilis harum sed id voluptates beatae praesentium! Incidunt maxime adipisci repellat rerum, error fuga blanditiis! Eos, quia. Aliquid consequuntur veritatis, commodi facere neque ratione unde laboriosam culpa delectus, reprehenderit quas, aut officia quasi sed! Minus ipsa, suscipit voluptatibus animi velit cum quaerat officiis, pariatur delectus voluptatem, provident consectetur blanditiis libero recusandae possimus. Iusto eos quidem, quasi earum vel deleniti. Deserunt pariatur suscipit repudiandae placeat est debitis qui et earum possimus illum tempore accusamus voluptatem natus asperiores eligendi nobis non at minima temporibus dolorem ipsam totam obcaecati, id aut! Corporis nostrum id error aut consectetur. Explicabo tenetur quidem praesentium iusto quae natus dolore a fugit quam cumque unde dignissimos ad deleniti qui modi assumenda dolorum porro architecto necessitatibus, blanditiis veritatis, itaque consequuntur ducimus est. Natus doloremque, dicta sunt deleniti adipisci fuga voluptatibus dolore nisi tenetur fugiat, eveniet, eaque ipsam quo pariatur explicabo quis omnis vitae at? Saepe consequatur dolores voluptate laboriosam nemo nihil, sunt ducimus quia fugit quos, quis ratione culpa, officia sed numquam porro provident alias aperiam! Ad veritatis sunt, amet nesciunt facilis cum ducimus dolores laudantium consequuntur officiis vero dolore cumque sapiente dolor fugiat molestias ratione ipsum vel? Ipsa facere aliquid modi voluptas corporis, repudiandae quis magnam quam placeat assumenda quidem deleniti incidunt fuga, illo debitis, reiciendis quos at enim consectetur eos. Rerum, neque modi? Obcaecati dolor odit excepturi accusantium ipsum sequi earum facilis quibusdam cupiditate magni ea hic eum ut sed, quas ipsa iure asperiores optio eveniet. Aut atque facilis laudantium, vel incidunt cumque veniam impedit. Quam, itaque. Corporis tempora quasi facere enim natus totam fugiat unde possimus similique corrupti qui iste dolore, repudiandae doloribus ratione. Corporis vitae iusto tenetur eaque quidem cupiditate officiis temporibus dolorem quisquam neque laborum odio autem at sed a placeat dicta et nemo assumenda quo, cumque velit in aliquid ducimus! Dicta natus nisi odio ullam nam corporis corrupti laborum consequatur sint nemo, ipsa ut harum magni fuga voluptas quis accusantium? Modi cupiditate neque ab nesciunt pariatur, est deleniti. Qui, distinctio, minus aspernatur repellendus inventore laborum excepturi assumenda molestiae odio, sunt commodi accusantium. Esse eum quam maxime voluptates mollitia quia necessitatibus vel odio? Maiores reprehenderit adipisci eaque, quam rem eveniet delectus exercitationem hic. Eum, vitae esse consequatur maiores harum corrupti quidem reprehenderit repudiandae quisquam voluptates eligendi deleniti repellendus et iusto aliquid voluptatum. Obcaecati eum non ullam officia praesentium id asperiores voluptatum facere qui impedit, eos, officiis commodi debitis alias. Sint quasi illum, ab ad dolor cum corrupti quam similique cumque et doloribus dignissimos doloremque? Reiciendis magni consectetur officiis aperiam quos autem inventore beatae voluptatum eaque fuga, numquam ullam soluta nesciunt porro rem architecto quam quisquam laborum odio commodi, quia dolore. Dolorem commodi sint id quisquam suscipit cumque dolor illum repellat tempora. Pariatur itaque eligendi minus error consequuntur, mollitia ipsa temporibus. Repellat libero architecto dicta dolor ratione voluptatum minus odit facere nisi perspiciatis quas exercitationem inventore, voluptatibus sint? Illum ipsa minima amet! Similique, laudantium fugiat ad facilis aperiam quidem tenetur rerum necessitatibus corrupti? Est distinctio a libero eveniet iste autem ipsa dicta rem optio nihil ducimus, aliquid fugiat recusandae sequi, labore quia! Corporis illum quis quam quidem ut corrupti ex quo officia veniam eum obcaecati cum, laboriosam dolore suscipit, aspernatur inventore? Ratione voluptate ab sunt vero similique saepe iusto nisi possimus, odio quae minima sit earum inventore hic voluptates omnis deserunt accusantium, perspiciatis ea. Earum sit modi hic, sequi, possimus enim architecto qui praesentium dolor corrupti ipsa? Veritatis, amet sed veniam quos rem consequatur officia ipsum quam voluptatem reiciendis aspernatur eaque alias magni ipsa! Unde praesentium vel repudiandae alias corporis voluptate ab illum, fugiat voluptatum neque deserunt quod qui cum inventore, nam dolores. Modi atque similique maxime unde necessitatibus rem blanditiis optio dolorem maiores beatae, quod recusandae et harum accusamus! Quo error laborum a explicabo ipsum at. Totam nulla saepe ducimus dolorum cum libero laboriosam quo. Odio dolorum tenetur modi sed ipsum provident dignissimos dolore, vel excepturi. Eum eaque enim saepe consequatur voluptatibus distinctio officia architecto. Repudiandae eligendi ab sed ullam molestias iure reprehenderit necessitatibus quae dolorem aliquam, natus obcaecati excepturi laborum doloribus? Ipsam velit nostrum, corrupti quasi debitis dolorum autem, quod deleniti cupiditate quae minima id ratione sed pariatur dignissimos recusandae. Ex, nemo autem. Facilis vel ut aspernatur esse necessitatibus autem, sapiente recusandae minus itaque nihil porro exercitationem qui cum corrupti deleniti vitae culpa dolor rerum? Quod praesentium, beatae quas omnis eaque porro voluptatem iure sit numquam, tempore fugit natus harum atque quibusdam laudantium cupiditate ducimus magnam officiis debitis delectus! Dolores beatae facere tempore, facilis voluptatum minus neque earum quam repellat iusto commodi eaque non! Distinctio placeat voluptas soluta, et unde libero dignissimos dolore enim id consectetur quidem maiores aut illum aliquid fugit maxime modi provident. Voluptatibus dolorem hic distinctio blanditiis minus voluptatem repellat fugiat odio ea iste. Blanditiis, necessitatibus dicta architecto non ducimus rem consectetur id odio facere, atque aspernatur delectus, ad quia aut molestias laudantium labore optio accusantium rerum iusto? Similique?
          </div> */}
          {/* <Footer /> */}
          <Themecustomizer />
        </div>
      </div>
      {/* <span
        onClick={() => { Cookies.remove("isLogged"); navigate('/') }}
      >Logout</span> */}
    </>
  );
};

export default Layout;