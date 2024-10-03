import { Container, Row, Col } from "reactstrap";
import LoginTab from "./Tabs/LoginTab";
import LoginBanner from '../../Assets/logo/image_2024_09_23T11_14_52_136Z.png'
import { useState } from "react";
import PageLoader from "../Layout/PageLoader";
import { BiSupport } from "react-icons/bi";
const Logins = (props) => {
  const [pageLoading, setPageLoading] = useState(true);
  return (
    <>
      {pageLoading ? <PageLoader set={setPageLoading} value={pageLoading} />
        : <Container fluid={true} className="p-0 login-page bg-slate-50">
          <Row>
            <Col xs="12">
              <div className="login-card flex-column">
                <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-10">
                  <div className=" w-full md:w-[50%]">
                    <LoginTab props={props} />
                  </div>
                  <div className=" w-full md:w-[520px] object-center object-contain md:object-cover h-[220px] bg-red  md:h-[460px]">
                    <img src={LoginBanner} className=" shadow-xl border object-fit object-center w-full h-full bg-red rounded-[16px]" alt="" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="support-div absolute bottom-0 right-0 mb-4 mr-4">
            <div className="rounded-[10px] p-2">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=themes@itgeeks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex hover:no-underline hover:text-black cursor-pointer gap-1 items-center"
              >
                <BiSupport />
                <span>Support</span>
              </a>
            </div>
          </div>
        </Container>}
    </>
  );
};

export default Logins;