import { UI_CONSTS } from "@consts";
import { L } from "@web-core";

import Text from "./Text";
import Button from "./Button/Button";
import Icon from "./Icon/Icon";
import NavBar from "./NavBar/NavBar";
import BackButton from "./BackButton/BackButton";

import type { IconNames } from "./Icon/Icon";
import type { FontType } from "./Text";

const Flex = L.FlexComponentGenerator(UI_CONSTS.THEME);

export { Text, Button, Icon, IconNames, FontType, NavBar, Flex, BackButton };
