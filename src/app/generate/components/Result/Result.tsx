import { useStepContext } from "@app/generate/StepContext";
import { PhotoTypes } from "@types";
import React from "react";
import Processing from "./templates/Processing";
const Result = ({ request }: { request: PhotoTypes.Request }) => {
  const { style } = useStepContext();

  const render = () => {
    switch (request.requestStatus) {
      case "PROCESSING":
        return <Processing request={request} />;
    }
  };

  return render();
};
export default React.memo(Result);
