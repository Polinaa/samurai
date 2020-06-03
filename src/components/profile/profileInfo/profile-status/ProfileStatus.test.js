import React from 'react';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile Status component", () => {
    test("Status from props should be in the state", () => {
        const component = create(<ProfileStatus status = "OK"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("OK");
    });

    test("Span should be displayed after creation", () => {
        const component = create(<ProfileStatus status = "OK"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("Input should not be displayed after creation", () => {
        const component = create(<ProfileStatus status = "OK"/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("Span should have correct status", () => {
        const component = create(<ProfileStatus status = "OK"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("OK");
    });

    test("Input should be displayed in edit mode", () => {
        const component = create(<ProfileStatus status = "OK"/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("OK");
    });

    test("Callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status = "OK" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.updateStatusAndDeActivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});