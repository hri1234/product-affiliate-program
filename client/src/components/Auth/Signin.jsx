import { Container, Row, Col } from "reactstrap";
import { Image } from "../AbstractElements";
import LoginTab from "./Tabs/LoginTab";
// import LoginBanner from '../../Assets/loginBanner.png'
import LoginBanner from '../../Assets/logo/banner1.jpg'

const Logins = (props) => {

  return (
    <Container fluid={true} className="p-0 login-page bg-slate-50">
      <Row>
        <Col xs="12">
          <div className="login-card flex-column">
            {/* <div className="logo">
              <Image
                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                src={require("../../Assets/logo/itg_logo.webp")}
              />
            </div> */}
            <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-10">
              <div className=" w-full md:w-[48%]">
                <LoginTab props={props} />
              </div>
              <div className=" w-full md:w-[520px] object-center object-contain md:object-cover h-[220px] bg-red  md:h-[460px]">
                <img src={LoginBanner} className=" shadow-xl border object-contain object-center w-full h-full bg-red rounded-[16px]" alt="" />
              </div>
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default Logins;