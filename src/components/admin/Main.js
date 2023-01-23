import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Spinner, Dropdown } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import { Link } from 'react-router-dom';
import editing from 'assets/img/icons/spot-illustrations/21.png';
import { supabase } from 'supabase/supabaseClient';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import EditUser from './EditUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Main = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true)
    const {error, data} = await supabase.from('clients').select().neq('status','cancelled')
    setUsers(data)
    setIsLoading(false)
  }, [])

  const columns = [
    {
      accessor: 'full_name',
      Header: 'Name'
    },
    {
      accessor: 'email',
      Header: 'Email',
      Cell: rowData => {
        const { email } = rowData.row.original

        const user = users.find(user => user.email === email)

        return(
          <Link to={`edituser/${user.id}`}> {email}
          </Link>
        ) 
      }
    }, 
    {
      accessor: 'status',
      Header: 'Status'
    }
  ];

  function BulAction({ selectedRowIds }){
    return (
      <Row className="flex-between-center mb-3">
        <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
          <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
            {
              Object.keys(selectedRowIds).length > 0 ?
              'You have selected ' + Object.keys(selectedRowIds).length + ' rows' 
              :
              ''
            }
          </h5>
        </Col>
        <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
          {Object.keys(selectedRowIds).length > 0 ? (
            <div className="d-flex">
              <Form.Select size="sm" aria-label="Bulk actions">
                <option>Bulk Actions</option>
                <option value="refund">Refund</option>
                <option value="delete">Delete</option>
                <option value="archive">Archive</option>
              </Form.Select>
              <Button
                type="button"
                variant="falcon-default"
                size="sm"
                className="ms-2"
              >
                Apply
              </Button>
            </div>
            ) : (
              <div id="orders-actions">
                {/* <IconButton
                  variant="falcon-default"
                  size="sm"
                  icon="plus"
                  transform="shrink-3"
                  className='me-2'
                >
                  <span className="d-none d-sm-inline-block ms-1">New</span>
                </IconButton> */}
                {/* <IconButton
                  variant="falcon-default"
                  size="sm"
                  icon="external-link-alt"
                  transform="shrink-3"
                >
                  <span className="d-none d-sm-inline-block ms-1">Export</span>
                </IconButton> */}
              </div>
            )}
        </Col>
      </Row>
    );
  };

  return (
    <Card>
      <Card.Body>
        {isLoading ? 
          <Spinner 
            animation="border" 
            role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          : ''}
        <h4>Active Users</h4>
        <AdvanceTableWrapper
          columns={columns}
          data={users}
          sortable
          pagination
          perPage={5}
          // selection
          // selectionColumnWidth={30}
        >
          <BulAction table/>
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              striped: true,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
        </AdvanceTableWrapper>
        </Card.Body>
    </Card>
      );
    }
  
export default Main;


