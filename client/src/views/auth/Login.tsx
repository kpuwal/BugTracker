import { Link } from "react-router-dom";
import Logo from '../../assets/img/car.png';

type LoginProps = {
  register?: boolean,
}

export default function Login({register}: LoginProps) {
  return (
    <>
      {/* <div className="container mx-auto px-4 h-full"> */}
        {/* <div className="flex content-center items-center justify-center h-full"> */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sm rounded-lg bg-blueGray-50 border-0 top-25-px">
              
              <div className="py-3" style={{alignSelf: 'center'}}>
                <img 
                  src={Logo} 
                  style={{width: '60px', height:'60px', marginLeft: '15px'}}
                  alt='logo' 
                />
                <code>BugTrucker</code>
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small></small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>

                  {register ?
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Repeat Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>
                  : <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-1 rounded text-blueGray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>}

                  <div className="text-center mt-6">
                    <button
                      className="bg-pink-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-t
                       hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      {
                        register ? "Register" : "Log In"
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative top-15-px">
              <div className="w-1/2" />
              {register ?
                <div className="w-1/2 text-right">
                  <Link to="/" className="text-blueGray-800">
                    <small>Back To Log In</small>
                  </Link>
                </div>
                : <div className="w-1/2 text-right">
                  <Link to="/register" className="text-blueGray-800">
                    <small>Create new account</small>
                  </Link>
                </div>}
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </>
  );
}
