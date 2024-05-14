import { Flex, Icon, Text } from "@components";
import { PhotoTypes } from "@types";
import { commonHooks } from "@web-core";
import {
  addHours,
  differenceInSeconds,
  hoursToSeconds,
  minutesToSeconds,
  secondsToHours,
  secondsToMinutes,
} from "date-fns";
import React, { useCallback, useState } from "react";

const Timer = ({ createYmdt }: Pick<PhotoTypes.Request, "createYmdt">) => {
  const calcDiff = useCallback(
    (now: Date) => {
      const expectedResultDate = addHours(new Date(createYmdt + "Z"), 6);
      return differenceInSeconds(expectedResultDate, now);
    },

    [createYmdt]
  );

  const [leftSeconds, setLeftSeconds] = useState(calcDiff(new Date()));

  commonHooks.useEverySecondEffect(
    useCallback((now) => {
      setLeftSeconds(calcDiff(now));
    }, [])
  );

  const hours = secondsToHours(leftSeconds);
  const minutes = secondsToMinutes(leftSeconds - hoursToSeconds(hours));
  const seconds =
    leftSeconds - hoursToSeconds(hours) - minutesToSeconds(minutes);

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <Flex
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
      alignItems={"center"}
      direction={"column"}
      justifyContent={"center"}
      // border={"1px solid red"}
    >
      <Icon name="lock" size={52} />
      <Text
        color="WHITE"
        type="20_Medium_Single"
        fontSize={`28px`}
        lineHeight={`33.6px`}
      >{`${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`}</Text>
      <Text type="18_Light_Single" color="WHITE" mt={4}>
        후에 열려요!
      </Text>
    </Flex>
  );
};

export default React.memo(Timer);
