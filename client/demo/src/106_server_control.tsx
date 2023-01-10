import React, { useMemo, useState } from "react"
import { ClientState } from "./hooks/useClient"

export type UseServerControlProps = {
    clientState: ClientState
}

export const useServerControl = (props: UseServerControlProps) => {
    const [isStarted, setIsStarted] = useState<boolean>(false)

    const startButtonRow = useMemo(() => {
        const onStartClicked = async () => {
            setIsStarted(true)
            await props.clientState.start()
        }
        const onStopClicked = async () => {
            setIsStarted(false)
            await props.clientState.stop()
        }
        const startClassName = isStarted ? "body-button-active" : "body-button-stanby"
        const stopClassName = isStarted ? "body-button-stanby" : "body-button-active"

        return (
            <div className="body-row split-3-3-4 left-padding-1  guided">
                <div className="body-item-title left-padding-1">Start</div>
                <div className="body-button-container">
                    <div onClick={onStartClicked} className={startClassName}>start</div>
                    <div onClick={onStopClicked} className={stopClassName}>stop</div>
                </div>
                <div className="body-input-container">
                </div>
            </div>

        )
    }, [isStarted, props.clientState.start, props.clientState.stop])

    const performanceRow = useMemo(() => {
        return (
            <>
                <div className="body-row split-3-1-1-1-4 left-padding-1 guided">
                    <div className="body-item-title left-padding-1">monitor:</div>
                    <div className="body-item-text">vol(rms):{props.clientState.volume.toFixed(4)}</div>
                    <div className="body-item-text">buf(ms):{props.clientState.bufferingTime}</div>
                    <div className="body-item-text">res(ms):{props.clientState.responseTime}</div>
                    <div className="body-item-text"></div>
                </div>
            </>
        )
    }, [props.clientState.volume, props.clientState.bufferingTime, props.clientState.responseTime])



    const infoRow = useMemo(() => {
        const onReloadClicked = async () => {
            const info = await props.clientState.getInfo()
            console.log("info", info)
        }
        return (
            <>
                <div className="body-row split-3-1-1-1-4 left-padding-1 guided">
                    <div className="body-item-title left-padding-1">Info:</div>
                    <div className="body-item-text">a</div>
                    <div className="body-item-text">b</div>
                    <div className="body-item-text">c</div>
                    <div className="body-button-container">
                        <div className="body-button" onClick={onReloadClicked}>reload</div>
                    </div>
                </div>
            </>
        )
    }, [props.clientState.getInfo])



    const serverControl = useMemo(() => {
        return (
            <>
                <div className="body-row split-3-7 left-padding-1">
                    <div className="body-sub-section-title">Server Control</div>
                    <div className="body-select-container">
                    </div>
                </div>
                {startButtonRow}
                {performanceRow}
                {infoRow}
            </>
        )
    }, [startButtonRow, performanceRow, infoRow])

    return {
        serverControl,
    }

}


