import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ManageMedicineData = () => {
  const [medicineData, setMedicineData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicineData();
  }, []);

  const fetchMedicineData = async () => {
    try {
      const token = localStorage.getItem("storeAuthToken");
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.store) {
        const storeId = decodedToken.store;
        const response = await axios.get(`/api/auth/medicine-data/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          const medicineData = response.data.data;
          setMedicineData(medicineData);
        } else {
          setError("Failed to fetch medicine data");
        }
      } else {
        setError("Decoded token does not contain store ID");
      }
    } catch (error) {
      console.error("Error fetching medicine data:", error);
      setError("Failed to fetch medicine data");
    }
  };

  const handleDelete = async (medicineDataId) => {
    try {
      const token = localStorage.getItem("storeAuthToken");
      const response = await axios.delete(`/api/auth/medicine-data/${medicineDataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setMedicineData(medicineData.filter((data) => data._id !== medicineDataId));
      } else {
        setError("Failed to delete medicine data");
      }
    } catch (error) {
      console.error("Error deleting medicine data:", error);
      setError("Failed to delete medicine data");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link to="/storeadmin/add-medicine-data" className="btn btn-primary">Add Medicine Data</Link>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {medicineData.length === 0 && !error && <div>No medicine data available.</div>}
        {medicineData.length > 0 && (
          <>
            <Table striped bordered hover>
              <thead className='thead'>
                <tr>
                  <th>S.No.</th>
                  <th>Medicine Name</th>
                  <th>Supplier Name</th>
                  <th>Batch Number</th>
                  <th>Expiry Date</th>
                  <th>Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='tbody'>
                {medicineData.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.medicineId.medicineName}</td>
                    <td>{data.supplierName}</td>
                    <td>{data.batchNo}</td>
                    <td>{data.expiryDate}</td>
                    <td>{data.qty}</td>
                    <td>
                      <Link to={`/storeadmin/edit-medicine-data/${data._id}`} className="btn btn-warning btn-sm mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(data._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageMedicineData;