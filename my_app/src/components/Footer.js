// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <div>
//       <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
//         <div className="col-md-4 d-flex align-items-center">
//           <Link
//             to="/"
//             className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
//           ></Link>
//           <span className="mb-3 mb-md-0 text-muted">
//             © 2024 Enchanté Bistro & Eclat
//           </span>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React from 'react';
import { Link } from "react-router-dom";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span className='fs-5 fw-bold'>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 d-flex align-items-center'>
                <Link to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/logo/Clear Logo.png"}
                    alt="Logo"
                    className="navbar-brand"
                    style={{ maxWidth: "50px", maxHeight: "50px", marginRight: "10px" }}
                  />
                </Link>
                Enchanté Bistro and Eclat
              </h6>
              <p>
                Indulge in a culinary journey where flavors dance, ambiance enchants, and every bite tells a story of passion and craft.
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright: Enchanté Bistro and Eclat
        <br />
        All rights reserved.
      </div>
    </MDBFooter>
  );
}