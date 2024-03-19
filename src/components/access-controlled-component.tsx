import { NextPage } from 'next';
import { UserAccessLevel, getUser } from 'lib/session';

interface Props {
  viewerRender: Element,
  editorRender: Element,
}

const AccessControlledComponent: (props: Props) => Promise<Element | JSX.Element> = async function AccessControlledComponent(props) {
  const user = await getUser() as any;

  if (user.userAccessLevel === UserAccessLevel.EDITOR) {
    return props.editorRender;
  }
  else if (user.userAccessLevel === UserAccessLevel.VIEWER) {
    return props.viewerRender;
  }
  else {
    return (<p>error</p>);
  }
};

export default AccessControlledComponent;