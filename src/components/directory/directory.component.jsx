import React from 'react';
import { connect } from 'react-redux'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import { createStructuredSelector } from 'reselect'

import MenuItem from '../menu-item/menu-item.component';
import { DirectoryMenuContainer } from './directory.styles.jsx' 
const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    {sections.map(({ id, ...others }) => (
      <MenuItem key={id} {...others} />
    ))}
  </DirectoryMenuContainer>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);