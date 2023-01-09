import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FormItem } from "./FormItem";

export const MultiStepForm = (props) => {
    const[answers, setAnswers] = useState([]);

    const updateAnwers = (value, category) => {
        setAnswers({...answers, [category] : value})
    }

    useEffect(() => {
        if (Object.keys(answers).length > 1)  {
            props.onPageUpdate(answers.index, answers);
            setAnswers({ index: props.step})
        } else {
            setAnswers({ index: props.step})
        }
    }, [props.step])

    return (
        <div className="text-left">
            {
                props.list[props.step - 1].items?.map((item, index) => {
                    return (
                        <FormItem key={item.label} item={item} onChange={updateAnwers} answer={props.pagesAnswers[props.step] ? props.pagesAnswers[props.step][item.value] : null}/>
                    )
                })
            }
        </div>
    )
}