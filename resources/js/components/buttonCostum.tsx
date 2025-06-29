import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function buttonCostum({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) {
    return (
        <>
            <Button type="submit" variant={'default'} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        isLoading
                    </>
                ) : children}
            </Button>
        </>
    )
}