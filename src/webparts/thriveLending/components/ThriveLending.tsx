import * as React from "react";
import styles from "./ThriveLending.module.scss";
import { IThriveLendingProps } from "./IThriveLendingProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Partners from "./Partners";

export default class ThriveLending extends React.Component<
  IThriveLendingProps,
  {}
> {
  constructor(prop: IThriveLendingProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IThriveLendingProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Partners context={this.props.context} sp={sp} />;
  }
}
