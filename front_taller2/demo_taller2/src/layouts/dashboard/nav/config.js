// component
import PersonIcon from '@mui/icons-material/Person';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    section: 'usuarios',
    links: [
      {
        title: 'usuarios',
        path: '/dashboard/usuarios',
        icon: <PersonIcon/>,
      },
    ]
  },
];

export default navConfig;
