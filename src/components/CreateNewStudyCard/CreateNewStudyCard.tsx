import {CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Button} from "../ui/button";
import MemberSelect from "../../pages/ProjectPage/components/MemberSelect";
import React from "react";

function CreateNewStudyCard() {
    return (<div><CardHeader>
        <CardTitle> Create New Study </CardTitle>
    </CardHeader>
        <CardContent>
            <form className="w-[350px]">
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="studyname"> Study Name </Label>
                        <Input id="studyname" placeholder="Study Name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label id="studydescription"> Study Description </Label>
                        <Textarea id="studydescription" placeholder="Study Description"></Textarea>
                        <div className="flex flex-col space-y-1.5"></div>
                        <Label htmlFor="studymembers"> Study Members </Label>
                        {/*<Select>*/}
                        {/*    <SelectTrigger id="studymembers">*/}
                        {/*        <SelectValue placeholder="Select Members" />*/}
                        {/*    </SelectTrigger>*/}
                        {/*    <SelectContent position="popper">*/}
                        {/*        <SelectItem value="member"> Member </SelectItem>*/}
                        {/*    </SelectContent>*/}
                        {/*</Select>*/}
                        <MemberSelect/>
                        <div className="flex flex-col space-y-1.5"></div>
                        <Label htmlFor="studygoogledrivelink"> Study Google Drive Link </Label>
                        <Input id="studygoogledrivelink" placeholder="Google Drive Link" />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline">
                Cancel
            </Button>
            <Button>
                Confirm
            </Button>
        </CardFooter></div>)
};

export default CreateNewStudyCard