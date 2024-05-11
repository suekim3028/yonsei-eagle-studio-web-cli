import { UI_CONSTS } from "@consts";
import { L } from "@web-core";

import BackButton from "./BackButton/BackButton";
import Button from "./Button/Button";
import Icon from "./Icon/Icon";
import NavBar from "./NavBar/NavBar";
import Text from "./Text";

import BgContainer from "./BgContainer/BgContainer";
import type { ErrorModalProps } from "./ErrorModal/ErrorModal";
import ErrorModal from "./ErrorModal/ErrorModal";
import type { IconNames } from "./Icon/Icon";
import type { FontType } from "./Text";
const Flex = L.FlexComponentGenerator(UI_CONSTS.THEME);

export {
  BackButton,
  BgContainer,
  Button,
  ErrorModal,
  ErrorModalProps,
  Flex,
  FontType,
  Icon,
  IconNames,
  NavBar,
  Text,
};
