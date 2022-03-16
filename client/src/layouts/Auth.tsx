import Login from "../views/auth/Login";
// import Background from '../assets/img/bg.png';

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-100 bg-no-repeat bg-full"
          >
            <div className="absolute w-full h-full py-40 min-h-screen">
              <Login />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
