import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import { TCompletionParam, TPrivacy, TPrivacyParam, TSearchParam } from "../types";

export interface ILoginFormValues {
    email: string;
    password: string;
}

export interface ISignupFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ISignupFormComponentProps {
    values: ISignupFormValues;
    errors: FormikErrors<ISignupFormValues>;
    handleChange: { (e: ChangeEvent<any>): void; <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void; };
    handleFormSubmit: () => void;
}

export interface ILoginFormComponentProps {
    values: ILoginFormValues;
    errors: FormikErrors<ILoginFormValues>;
    handleChange: { (e: ChangeEvent<any>): void; <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void; };
    handleFormSubmit: () => void;
}

export interface IAuthFormResponse {
    data: { 
        token: string;
    };
}

export interface IParamsProps {
    searchParam: TSearchParam;
    completionParam: TCompletionParam;
    privacyParam: TPrivacyParam;
}

export interface IQueryParams {
    search: TSearchParam;
    completion: TCompletionParam;
    privacy: TPrivacyParam;
}

export interface IParamsPropsSetters {
    setSearchParam: (param: TSearchParam) => void;
    setCompletionParam: (param: TCompletionParam) => void;
    setPrivacyParam: (param: TPrivacyParam) => void;
}

export interface IPaginationProps {
    paginationLimit: number;
    paginationOffset: number;
    totalCount: number;
}

export interface IPaginationPropsSetters {
    handlePaginateForward: () => void;
    handlePaginateBackward: () => void;
}

export interface ITodoItem {
    _id: string;
    title: string;
    description: string;
    completion: boolean;
    date: Date;
    privacy: TPrivacy;
}

export interface ITodoFormValues {
    title: string;
    description: string;
    privacy: TPrivacy;
    completion: boolean;
}