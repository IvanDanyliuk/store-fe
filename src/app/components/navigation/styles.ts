import { 
  PRIMARY_COLOR, 
  BASIC_BACKGROUND_WHITE, 
  MENU_BACKGROUND_COLOR, 
  BURGER_BARS_COLOR, 
  BURGER_SHAPE_COLOR 
} from '../../services/constants';


export default {
  bmBurgerButton: {
    position: 'relative',
    marginRight: '20px',
    width: '20px',
    height: '20px',
  },
  bmBurgerBars: {
    background: BASIC_BACKGROUND_WHITE,
  },
  bmBurgerBarsHover: {
    background: BURGER_BARS_COLOR,
  },
  bmCrossButton: {
    position: 'absolute',
    right: '20px',
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: PRIMARY_COLOR,
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: '0px',
    left: '0px',
  },
  bmMenu: {
    background: MENU_BACKGROUND_COLOR,
    padding: '2.5em 1.5em 0',
    fontSize: '1em',
    fontWeight: '600',
  },
  bmMorphShape: {
    fill: BURGER_SHAPE_COLOR,
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    background: 'rgba(0, 0, 0, 0.3)',
  },
};