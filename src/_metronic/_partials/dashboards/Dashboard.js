import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {Demo1Dashboard} from "./Demo1Dashboard";
import {Demo2Dashboard} from "./Demo2Dashboard";
import {Demo3Dashboard} from "./Demo3Dashboard";
import {Demo4Dashboard} from "./Demo4Dashboard";
import {Demo5Dashboard} from "./Demo5Dashboard";
import {Demo6Dashboard} from "./Demo6Dashboard";
import {Demo7Dashboard} from "./Demo7Dashboard";

export function Dashboard() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1Dashboard />}
        {layoutProps.demo === 'demo2' && <Demo2Dashboard />}
    </>;
}
