import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Table, Dropdown } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import { Link } from 'react-router-dom';
import editing from 'assets/img/icons/spot-illustrations/21.png';
import { supabase } from 'supabase/supabaseClient';

const Main = () => {

  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const {error, data} = await supabase.from('clients').select()
    console.log(data);
    setUsers(data)
  }, [])

  return (
    <Card>
      <Card.Body className="overflow-hidden p-lg-6">
      <Row className="align-items-center justify-content-between">
      <h2>Users</h2>
    <Table striped responsive>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th className="text-end" scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, i) => {
        return [
            <tr key={i}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td className="text-end">
              <CardDropdown>
                <div className="py-2">
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                </div>
              </CardDropdown>
            </td>
            </tr>
          ];
      })}
    </tbody>
    </Table>
    </Row>
    </Card.Body>
    </Card>

  );
};

export default Main;


