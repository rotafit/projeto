import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                subscriptionId?: string;
                trialEndDate?: Date;
            };
        }
    }
}
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkSubscription: (requiredPlan: "essencial" | "avancado" | "premium", allowTrial?: boolean) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
