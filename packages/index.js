import Vue from 'vue';
import Icon from './Icon';
import Loading from './Loading';
import Button from './Button';
import Row from './Layout/Row';
import Col from './Layout/Col';
import Flex from './Layout/Flex';
import NavBar from './NavBar';
import Cell from './Cell';
import CellGroup from './Cell/group';
import Uploader from './Uploader';
import Croper from './Croper';
import Skeleton from './Skeleton';
import ActionSheet from './Sheet/action-sheet';

import Swipe from './Swipe/swipe';
import SwipeItem from './Swipe/swipe-item';


import {
  Waterfall,
  WaterfallSlot
} from './Waterfall';


import './Toast';
import './Dialog';
import './Sheet';
import './filters/slice';
import './filters/formateDate';

const ui = {
  Icon,
  Loading,
  Button,
  Col,
  Cell,
  CellGroup,
  Row,
  Flex,
  NavBar,
  Uploader,
  Croper,
  Skeleton,
  Waterfall,
  WaterfallSlot,
  ActionSheet,
  Swipe,
  SwipeItem
}

export default {
  install(Vue) {
    Object.keys(ui).forEach(item => {
      Vue.component(item, ui[item])
    });
  }
};