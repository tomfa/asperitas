import withAuth from '../../util/withAuth';
import Sidebar from './Component';
import { withRouter } from 'react-router-dom';

const SidebarContainer = withRouter(withAuth(Sidebar));

export default SidebarContainer;
