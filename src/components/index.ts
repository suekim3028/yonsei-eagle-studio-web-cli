import { UI_CONSTS } from "@consts";
import { L } from "@web-core";

import BackButton from "./BackButton/BackButton";
import Button from "./Button/Button";
import Icon from "./Icon/Icon";
import NavBar from "./NavBar/NavBar";
import Text from "./Text";

import AuthRouterWrapper from "./AuthRouterWrapper/AuthRouterWrapper";
import BgContainer from "./BgContainer/BgContainer";
import Carousel from "./Carousel/Carousel";
import type { ErrorModalProps } from "./ErrorModal/ErrorModal";
import ErrorModal from "./ErrorModal/ErrorModal";
import type { IconNames } from "./Icon/Icon";
import Loader from "./Loader/Loader";
import type { FontType } from "./Text";
import UploadPhotoExamples from "./UploadPhotoExamples/UploadPhotoExamples";

const Flex = L.FlexComponentGenerator(UI_CONSTS.THEME);

export {
  AuthRouterWrapper,
  BackButton,
  BgContainer,
  Button,
  Carousel,
  ErrorModal,
  ErrorModalProps,
  Flex,
  FontType,
  Icon,
  IconNames,
  Loader,
  NavBar,
  Text,
  UploadPhotoExamples,
};
