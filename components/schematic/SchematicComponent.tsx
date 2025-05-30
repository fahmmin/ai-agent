import SchematicEmbed from "./SchematicEmbed";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";

async function SchematicComponent({ componentId }: { componentId: string }) {
  if (!componentId) {
    return null;
  }

  const accessToken = await getTemporaryAccessToken();
  console.log("accessToken", accessToken);

  if (!accessToken) {
    return null;
  }

  return (
    <div>
      <SchematicEmbed componentId={componentId} accessToken={accessToken} />
    </div>
  );
}

export default SchematicComponent;
