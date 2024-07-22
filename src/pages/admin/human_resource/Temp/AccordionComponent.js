
import React, { useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  FormGroup,
  Input,
} from 'reactstrap';

import Button from '@mui/material/Button';
import { styled } from '@mui/system';

function Example(props) {
  const [open, setOpen] = useState('1');
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [undoDeleteChecked, setUndoDeleteChecked] = useState(false);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleDeleteChange = (e) => {
    e.stopPropagation();
    setDeleteChecked(!deleteChecked);
  };

  const handleUndoDeleteChange = (e) => {
    e.stopPropagation();
    setUndoDeleteChecked(!undoDeleteChecked);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    // Handle delete action
    console.log('Delete clicked');
  };

  const handleUndoDeleteClick = (e) => {
    e.stopPropagation();
    // Handle undo delete action
    console.log('Undo delete clicked');
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">
            <FormGroup check className="mr-2" onClick={(e) => e.stopPropagation()}>
              <Input type="checkbox" checked={deleteChecked} onChange={handleDeleteChange} />
            </FormGroup>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Button disabled={!deleteChecked} className="mr-2" onClick={handleDeleteClick}>
                <Avatar color='red'>
                  <DeleteIcon/>
                </Avatar>
              </Button>
              
              <FormGroup check className="mr-2" onClick={(e) => e.stopPropagation()}>
                <Input type="checkbox" checked={undoDeleteChecked} onChange={handleUndoDeleteChange} />
                {' '}
                Undo Delete
              </FormGroup>
              
              <Button color="secondary" disabled={!undoDeleteChecked} onClick={handleUndoDeleteClick}>
                Undo Delete
              </Button>
            </div>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <strong>This is the first item&#39;s accordion body.</strong>
            You can modify any of this with custom CSS or overriding our default
            variables. It&#39;s also worth noting that just about any HTML can
            go within the <code>.accordion-body</code>, though the transition
            does limit overflow.
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Example;
