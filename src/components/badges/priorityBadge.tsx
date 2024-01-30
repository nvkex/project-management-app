import { Fragment, FunctionComponent } from "react";
import Badge from "../badge";
import CustomMenu from "../customMenu";
import { PRIORITY_ICON, PRIORITY_LIST_AS_OPTIONS, shadeByPriorityType } from "~/utils/priorityConstants";
import { api } from "~/utils/api";

type PriorityBadgeProps = {
    children: React.ReactNode,
    variant?: string,
    taskId: string
}

type OptionType = {
    label: string,
    value: string
}

const PriorityBadge: FunctionComponent<PriorityBadgeProps> = ({ taskId, children, variant = 'muted' }) => {

    const mutation = api.task.updateProperties.useMutation();

    const onChange = (option:OptionType) => {
        mutation.mutate({
            title:null, description:null, assigneeId: null, status: null,
            priority: option.value,
            taskId: taskId
        })
    }

    const menuItems = PRIORITY_LIST_AS_OPTIONS.map(option => {
        return (active: boolean) => {
            const Icon = PRIORITY_ICON[option.value] || Fragment
            const shade = `text-${shadeByPriorityType[option.value] || 'amber'}-800`
            
            return (
                <div className={`flex gap-2 p-1 text-sm hover:bg-gray-100 hover:cursor-pointer`} onClick={() => onChange(option)}>
                    <span><Icon width={18} height={18} className={`${shade}`}/></span><span>{option.label}</span>
                </div>
            )
        }
    })

    return (
        <CustomMenu id="priorityEdit" menuItems={menuItems}>
            <Badge variant={variant}>
                {children}
            </Badge>
        </CustomMenu>
    )
}


export default PriorityBadge;