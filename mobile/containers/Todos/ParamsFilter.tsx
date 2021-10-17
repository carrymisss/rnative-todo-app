import React, { useState } from "react";
import { useQueryClient } from "react-query";
import ParamsFilterComponent from "../../components/Todos/ParamsFilter";
import { IParamsProps, IParamsPropsSetters } from "../../interfaces";
import { REACT_QUERY_KEYS } from "../../utils/contants";

const ParamsFilter = ({ 
    searchParam,
    completionParam,
    privacyParam, 
    setSearchParam,
    setCompletionParam,
    setPrivacyParam,
    setPaginationOffset
}: IParamsProps & IParamsPropsSetters & { setPaginationOffset: (val: number) => void; }) => {
    const [filtersModalVisible, setFiltersModalVisible,] = useState<boolean>(false);
    const [enableCompletionParam, setEnableCompletionParam,] = useState<boolean>(false);
    const [enablePrivacyParam, setEnablePrivacyParam,] = useState<boolean>(false);
    const queryClient = useQueryClient();
    
    const handleEnabledCompletionParam = (): void => {
        setEnableCompletionParam(!enableCompletionParam);
        if (enableCompletionParam) {
            setCompletionParam(undefined);
        } else {
            setCompletionParam(true);
        }
    };

    const handleEnabledPrivacyParam = (): void => {
        setEnablePrivacyParam(!enablePrivacyParam);
        if (enablePrivacyParam) {
            setPrivacyParam(undefined);
        } else {
            setPrivacyParam("public");
        }
    };

    const handleChangeCompletionParam = (): void => {
        setCompletionParam(!completionParam);
    };

    const handleChangePrivacyParam = (val: "public" | "private") => (): void => {
        setPrivacyParam(val);
    };

    const handleChangeSearchParam = (text: string): void => {
        setSearchParam(text ? text : undefined);
    };

    const handleToggleFiltersModal = (val: boolean) => (): void => {
        setFiltersModalVisible(val);
    };

    const handleFindByParams = (): void => {
        setFiltersModalVisible(false);
        setPaginationOffset(0);
        queryClient.fetchQuery(REACT_QUERY_KEYS.ALL_TODOS);
    };

    const handleResetFilters = (): void => {
        setEnableCompletionParam(false);
        setEnablePrivacyParam(false);
        setCompletionParam(undefined);
        setPrivacyParam(undefined);
        setSearchParam(undefined);
        setTimeout(() => {
            handleFindByParams();
        }, 1);
    };


    return (
        <ParamsFilterComponent
            enablePrivacyParam={enablePrivacyParam}
            handleChangePrivacyParam={handleChangePrivacyParam}
            handleEnabledPrivacyParam={handleEnabledPrivacyParam}
            searchParam={searchParam}
            handleEnabledCompletionParam={handleEnabledCompletionParam}
            completionParam={completionParam}
            privacyParam={privacyParam}
            enableCompletionParam={enableCompletionParam}
            handleChangeSearchParam={handleChangeSearchParam}            
            handleChangeCompletionParam={handleChangeCompletionParam}
            filtersModalVisible={filtersModalVisible}
            handleToggleFiltersModal={handleToggleFiltersModal}
            handleResetFilters={handleResetFilters}
            handleFindByParams={handleFindByParams}
        />
    );
};

export default ParamsFilter;
