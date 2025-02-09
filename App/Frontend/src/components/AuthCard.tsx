import React, {FC} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

type AuthCardProps = {
    children: React.ReactNode;
    title: string;
};

const AuthCard :FC<AuthCardProps> = ({children, title}) => {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default AuthCard;
