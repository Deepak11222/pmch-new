import React from 'react';
import { Switch, Route,useLocation } from 'react-router-dom';
import PageSubCategory from './PageSubCategory';
import Ourteam from './Ourteam';
import Addstore from './Addstore';
import AddDoctorForm from './AddDoctorForm';
import ManageStore from './ManageStore';
import ManageCardiology from './ManageCardiology ';
import Managedoctors from './Managedoctors'
import AddCardiology from './AddCardiology';

const getPageName = (pathname) => {
  switch (pathname) {
    case '/admin/managestore':
      return 'Manage Store';
      case '/admin/pagesubcategory':
        return 'Page Sub Category';
        case '/admin/addstore':
        return 'Add Store';
    case '/admin/ourteam':
      return 'Our Team';
    // Add more cases as needed
    default:
      return 'SuperAdmin Dashboard';
  }
};


function ContentWrapper() {
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  return (
    <div className="content-wrapper" style={{ minHeight: '628px' }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
            <h1 className="m-0">{pageName}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">{pageName}</li>
              </ol>
            </div>
          </div>
        </div> 
      </div>
      <section className="content">
        <div className="container-fluid">
          <Switch>
            {/* <Route path="/admin/dashboard" component={Dashboard} /> */}
            <Route path="/admin/pagesubcategory" component={PageSubCategory} />
            <Route path="/admin/add-store" component={Addstore} />
            {/* <Route path="/admin/stores" component={Store} /> */}
            <Route path="/admin/add-cardiology" component={AddCardiology} />
            <Route path="/admin/cardiology" component={ManageCardiology} />
            <Route path="/admin/managestore" component={ManageStore} />
            <Route path="/admin/managstore" component={Managedoctors} />
            <Route path="/admin/doctor" component={AddDoctorForm} />
            {/* <Route path="/admin/store" component={Store} /> */}
            <Route path="/admin/ourteam" component={Ourteam} />
            {/* Add more routes as needed */}
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default ContentWrapper;
